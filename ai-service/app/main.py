from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image
import io
import json

from app.inference import load_model, classify_image


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 서버 시작 시
    load_model()
    yield
    # 서버 종료 시 (정리 작업 있으면 여기)


app = FastAPI(title="Calo AI Service", lifespan=lifespan)


@app.get("/")
def root():
    return {"status": "ok", "service": "calo-ai"}


@app.post("/classify")
async def classify(
    image: UploadFile = File(...),
    labels: str = Form(..., description="쉼표로 구분된 라벨 리스트 (예: 김치찌개,비빔밥,라멘)")):
    # 1. 업로드된 이미지를 PIL Image로 변환
    image_bytes = await image.read()
    pil_image = Image.open(io.BytesIO(image_bytes))
    
    # 2. 쉼표로 분리, 양옆 공백 제거, 빈 라벨 제거
    candidate_labels = [
        label.strip() 
        for label in labels.split(",") 
        if label.strip()
    ]
    
    # 3. 추론 실행
    results = classify_image(pil_image, candidate_labels)
    
    return {"results": results}