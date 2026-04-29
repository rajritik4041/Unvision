from transformers import pipeline

classifier = None

def get_model():
    global classifier
    if classifier is None:
        classifier = pipeline(
            "image-classification",
            model="microsoft/resnet-50"   # 🔥 lightweight (important)
        )
    return classifier


def predict_image(image):
    model = get_model()
    result = model(image)
    return result[0]