import warnings
import os
import sys
import joblib
import numpy as np

# Ignore warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Path to the trained model
model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'f_m_r_f_1.pkl')

# Load the trained model
model = joblib.load(model_path)

# Check the correct number of arguments
if len(sys.argv) != 10:
    print("Error: Expected 7 arguments: <consultation_revenue> <doctor_type_floating> <doctor_type_locum> <financial_class_hmo> <financial_class_insurance> <financial_class_medicare> <financial_class_private>")
    sys.exit(1)

try:
    # Parse input arguments
    consultation_revenue = float(sys.argv[1])
    CT_hour = float(sys.argv[2])
    ET_hour = float(sys.argv[3])
    doctor_type_floating = bool(int(sys.argv[4]))
    doctor_type_locum = bool(int(sys.argv[5]))
    financial_class_hmo = bool(int(sys.argv[6]))
    financial_class_insurance = bool(int(sys.argv[7]))
    financial_class_medicare = bool(int(sys.argv[8]))
    financial_class_private = bool(int(sys.argv[9]))

    # Feature array (excluding WT)
    features_array = np.array([[consultation_revenue, CT_hour, ET_hour, doctor_type_floating, doctor_type_locum,
                                financial_class_hmo, financial_class_insurance, financial_class_medicare,
                                financial_class_private]])
except ValueError as e:
    print("Error: Invalid argument type. Ensure all inputs are correctly formatted.")
    sys.exit(1)

# Make a prediction
prediction = model.predict(features_array)
print("Predicted wait time:", prediction[0])  # Outputs the first predicted value
