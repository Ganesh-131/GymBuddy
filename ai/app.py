from flask import Flask, jsonify, request
from exercises.bicep import run_bicep

app = Flask(__name__)

# Test route
@app.route("/")
def home():
    return jsonify({"message": "AI Server Running"})

# BICEP CURL
@app.route("/bicep", methods=["GET"])
def bicep():
    target = int(request.args.get("target", 10))  # default 10
    reps = run_bicep(target)
    return jsonify({"reps": reps})

# OPTIONAL (dummy for now)
@app.route("/pushup", methods=["GET"])
def pushup():
    return jsonify({"reps": 15})

@app.route("/squat", methods=["GET"])
def squat():
    return jsonify({"reps": 20})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)