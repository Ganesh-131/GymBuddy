import cv2
import mediapipe as mp
import numpy as np
import time

def run_bicep(target_reps):

    mp_pose = mp.solutions.pose
    mp_draw = mp.solutions.drawing_utils
    pose = mp_pose.Pose()

    def calculate_angle(a, b, c):
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)

        ba = a - b
        bc = c - b

        cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
        return np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0)))

    counter = 0
    stage = "DOWN"   # DOWN → UP → DOWN

    cap = cv2.VideoCapture(0)

    # 🔥 Bigger camera
    cap.set(3, 1280)
    cap.set(4, 720)

    start_time = time.time()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)

        h, w, _ = frame.shape
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = pose.process(rgb)

        if result.pose_landmarks:
            lm = result.pose_landmarks.landmark

            shoulder = (lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x * w,
                        lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y * h)

            elbow = (lm[mp_pose.PoseLandmark.LEFT_ELBOW].x * w,
                     lm[mp_pose.PoseLandmark.LEFT_ELBOW].y * h)

            wrist = (lm[mp_pose.PoseLandmark.LEFT_WRIST].x * w,
                     lm[mp_pose.PoseLandmark.LEFT_WRIST].y * h)

            angle = calculate_angle(shoulder, elbow, wrist)

            # ---------------- REP LOGIC ----------------
            if angle > 160:
                if stage == "UP":
                    counter += 1   # full rep completed
                stage = "DOWN"

            elif angle < 50:
                stage = "UP"

            # ---------------- DRAW ----------------
            mp_draw.draw_landmarks(frame,
                                   result.pose_landmarks,
                                   mp_pose.POSE_CONNECTIONS)

            cv2.putText(frame, f"Angle: {int(angle)}",
                        (30, 200), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0,255,0), 2)

        # ---------------- UI ----------------
        cv2.rectangle(frame, (0,0), (1280,120), (0,0,0), -1)

        cv2.putText(frame, "Gym Buddy - Bicep Curl",
                    (20,30), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (255,255,255), 2)

        cv2.putText(frame, f"Reps: {counter}",
                    (20,80), cv2.FONT_HERSHEY_SIMPLEX,
                    1.2, (0,255,0), 3)

        cv2.imshow("Gym Buddy", frame)

        # ---------------- STOP ----------------
        if counter >= target_reps:
            cv2.waitKey(500)
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    duration = int(time.time() - start_time)

    return counter, duration