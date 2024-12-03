
# import sys
# import joblib
# import numpy as np

# # Load the model
# # model = joblib.load('../model/wait_time_predictor.pkl')
# model_path = '/Users/abhishekkumar/Desktop/btp_project2/backend/model/wait_time_predictor.pkl'
# # model_path = '/Users/abhishekkumar/Desktop/btp project - 1/backend/model/wait_time_predictor.pkl'
# model = joblib.load(model_path)


# # Check if the required number of arguments is provided
# if len(sys.argv) != 4:
#     print("Error: Expected 3 arguments: <arrival_time> <department> <doctors_available>")
#     sys.exit(1)

# # Get features from command-line arguments
# try:
#     arrival_time = float(sys.argv[1])  # Adjust as necessary for your features
#     department = int(sys.argv[2])       # Adjust as necessary for your features
#     doctors_available = int(sys.argv[3]) # Adjust as necessary for your features
# except ValueError as e:
#     print("Error: Invalid argument type. Ensure <arrival_time> is a float and <department> and <doctors_available> are integers.")
#     sys.exit(1)

# # Create the features array
# features_array = np.array([[arrival_time, department, doctors_available]])

# # Make the prediction
# prediction = model.predict(features_array)
# print("Predicted wait time:", prediction[0])  # Adjusted to print the first predicted value
# print("Hello from Python!")




# # second
# import warnings
# warnings.filterwarnings("ignore", category=UserWarning)

# import os

# import sys
# import numpy as np
# import joblib

# # Load the model from the specified path
# model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'wait_time_predictor.pkl') #for hosting on render

# # model_path = '/Users/abhishekkumar/Desktop/btp_project2/backend/model/wait_time_predictor.pkl' #for local host
# model = joblib.load(model_path)

# # Check if the required number of arguments is provided
# if len(sys.argv) != 4:
#     print("Error: Expected 3 arguments: <arrival_time> <department> <doctors_available>")
#     sys.exit(1)

# # Get features from command-line arguments
# try:
#     arrival_time = float(sys.argv[1])  # Expecting a float
#     department = int(sys.argv[2])       # Expecting an integer
#     doctors_available = int(sys.argv[3]) # Expecting an integer
# except ValueError as e:
#     print("Error: Invalid argument type. Ensure <arrival_time> is a float and <department> and <doctors_available> are integers.")
#     sys.exit(1)

# # Create the features array in the correct shape for the model
# features_array = np.array([[arrival_time, department, doctors_available]])

# # Make the prediction
# prediction = model.predict(features_array)

# # Print the predicted wait time
# print("Predicted wait time:", prediction[0])  # Outputs the first predicted value





# third
import warnings
import os
import sys
import joblib
import numpy as np

# Ignore warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Path to the trained model
model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'final_model_1.pkl')

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
