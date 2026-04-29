from transformers import pipeline

# Load model once
classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

def predict_image(image):
    result = classifier(image)
    print(result)
    return result[0]   # top prediction