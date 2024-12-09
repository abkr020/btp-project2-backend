import warnings
import os
import sys
import numpy as np
import joblib
import traceback

# Ignore warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Path to trained model
model_path = os.path.join(os.path.dirname(__file__), '../models/random_forest_model_2.pkl')

try:
    # Debugging log: path check
    print("Model path being used:", model_path)
    if not os.path.exists(model_path):
        print("Model file is NOT found at path.")
        sys.exit(1)

    # Parse input arguments
    print("Arguments received:", sys.argv)
    features = np.array([float(i) for i in sys.argv[1:]]).reshape(1, -1)
    print("Parsed features:", features)

    # Load the model
    print("Attempting to load model...")
    model = joblib.load(model_path)
    print("Model loaded successfully.")

    # Perform prediction
    print("Attempting to make prediction...")
    prediction = model.predict(features)
    print("Prediction:", prediction)

    # Print result
    print(prediction[0])

except Exception as e:
    print("An error occurred.")
    traceback.print_exc()
    sys.exit(1)
