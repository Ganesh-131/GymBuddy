import cv2
import mediapipe as mp
import numpy as np
import pyttsx3

# ---------------- VOICE ----------------
engine = pyttsx3.init()
engine.setProperty('rate', 155)

def speak(text):
    engine.say(text)
    engine.runAndWait()

# ---------------- MEDIAPIPE ----------------
mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# ---------------- ANGLE FUNCTION ----------------
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
    angle = np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0)))

    return angle

# ---------------- VARIABLES ----------------
counter = 0
state = "INIT"
last_state = ""

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = pose.process(rgb)

    feedback = ""

    if result.pose_landmarks:
        lm = result.pose_landmarks.landmark

        # joints
        shoulder = (lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w,
                    lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h)

        elbow = (lm[mp_pose.PoseLandmark.LEFT_ELBOW].x * w,
                 lm[mp_pose.PoseLandmark.LEFT_ELBOW].y * h)

        wrist = (lm[mp_pose.PoseLandmark.LEFT_WRIST].x * w,
                 lm[mp_pose.PoseLandmark.LEFT_WRIST].y * h)

        angle = calculate_angle(shoulder, elbow, wrist)

        # ---------------- STATE MACHINE ----------------
        if state == "INIT":
            feedback = "Stand straight, arm down"
            if angle > 165:
                state = "READY"

        elif state == "READY":
            feedback = "Ready. Curl your arm"
            if angle < 60:
                state = "CURL"

        elif state == "CURL":
            feedback = "Good. Return down"
            if angle > 165:
                counter += 1
                state = "READY"

        # ---------------- VOICE CONTROL ----------------
        if state != last_state:
            speak(feedback)
            last_state = state

        # ---------------- DISPLAY ----------------
        cv2.putText(frame, f"Angle: {int(angle)}",
                    (30, 170), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2)

        mp_draw.draw_landmarks(frame,
                               result.pose_landmarks,
                               mp_pose.POSE_CONNECTIONS)

    # ---------------- UI PANEL ----------------
    cv2.rectangle(frame, (0, 0), (700, 140), (0, 0, 0), -1)

    cv2.putText(frame, "Gym Buddy - Bicep Curl",
                (20, 30), cv2.FONT_HERSHEY_SIMPLEX,
                1, (255, 255, 255), 2)

    cv2.putText(frame, f"Reps: {counter}",
                (20, 70), cv2.FONT_HERSHEY_SIMPLEX,
                1, (0, 255, 0), 2)

    cv2.putText(frame, f"State: {state}",
                (20, 110), cv2.FONT_HERSHEY_SIMPLEX,
                0.9, (0, 255, 255), 2)

    # ---------------- WINDOW ----------------
    cv2.imshow("Gym Buddy", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# ---------------- CLEANUP ----------------
cap.release()
cv2.destroyAllWindows()

# ---------------- RETURN RESULT ----------------
print(counter, flush=True)