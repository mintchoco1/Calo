* ViT, DeiT, CLIP, SigLIP 아키텍처 차이

ViT (Vision Transformer, 2020, google)
이미지를 처음으로 트랜스포머에 그대로 던져넣은 모델
원래 NLP의 트랜스포머는 문장을 단어 단위로 쪼개서 처리. ViT는 똑같은 일을 이미지에 함
이미지를 16x16 픽셀짜리 작은 패치로 격자처럼 잘라서, 각 패치를 단어처럼 취급.
224x224 이미지면 14x14=196개의 패치가 나오고 이걸 트랜스포머에 그대로 넣음
[이미지] → [패치로 자르기] → [각 패치를 벡터로 임베딩]
        → [위치 정보 추가] → [Transformer Encoder]
        → [CLS 토큰으로 분류]





Softmax vs Sigmoid 차이
Zero-shot 분류의 원리
API 설계 트레이드오프 (JSON vs 콤마 구분)