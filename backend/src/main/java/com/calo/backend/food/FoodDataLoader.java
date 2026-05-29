package com.calo.backend.food;

import java.io.InputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.calo.backend.food.entity.Food;
import com.calo.backend.food.repository.FoodRepository;

import lombok.RequiredArgsConstructor;

/**
 * 앱이 시작될 때 식약처 엑셀 파일을 읽어서 Food 테이블에 한 번 적재한다.
 */
@Component
@RequiredArgsConstructor
public class FoodDataLoader implements CommandLineRunner {

    private final FoodRepository foodRepository;

    // 엑셀에서 컬럼이 몇 번째 칸에 있는지 (0부터 시작)
    private static final int COL_NAME = 1;       // 식품명
    private static final int COL_CALORIES = 17;  // 에너지(kcal)
    private static final int COL_PROTEIN = 19;   // 단백질(g)
    private static final int COL_FAT = 20;       // 지방(g)
    private static final int COL_CARBS = 22;     // 탄수화물(g)
    private static final int COL_SUGAR = 23;     // 당류(g)

    @Override
    public void run(String... args) throws Exception {

        // 이미 데이터가 있으면 또 넣지 않음 (중복 방지)
        if (foodRepository.count() > 0) {
            System.out.println("Food 데이터가 이미 있어서 적재를 건너뜁니다.");
            return;
        }

        // resources 폴더의 엑셀 파일 열기
        ClassPathResource resource = new ClassPathResource("food.xlsx");
        try (InputStream is = resource.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0); // 첫 번째 시트

            int savedCount = 0;

            // 1번째 줄(헤더) 건너뛰고 2번째 줄부터 읽기
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                String nameKo = getString(row.getCell(COL_NAME));
                if (nameKo == null || nameKo.isBlank()) continue; // 이름 없으면 스킵

                Double calories = getNumber(row.getCell(COL_CALORIES));
                Double protein = getNumber(row.getCell(COL_PROTEIN));
                Double fat = getNumber(row.getCell(COL_FAT));
                Double carbs = getNumber(row.getCell(COL_CARBS));
                Double sugar = getNumber(row.getCell(COL_SUGAR));

                Food food = new Food(
                        nameKo,
                        null,        // nameEn (식약처엔 없으니 null)
                        calories,
                        carbs,
                        protein,
                        fat,
                        sugar,
                        "MFDS"       // 출처: 식약처
                );

                foodRepository.save(food);
                savedCount++;
            }

            System.out.println("Food 데이터 적재 완료: " + savedCount + "건");
        }
    }

    // 셀 값을 문자열로 안전하게 꺼내기
    private String getString(Cell cell) {
        if (cell == null) return null;
        return cell.toString().trim();
    }

    // 셀 값을 숫자로 안전하게 꺼내기 (빈 칸이면 0.0)
    private Double getNumber(Cell cell) {
        if (cell == null) return 0.0;
        try {
            return cell.getNumericCellValue();
        } catch (Exception e) {
            // 숫자가 아닌 값(예: "-")이 들어있으면 0.0 처리
            return 0.0;
        }
    }
}