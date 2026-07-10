from flask import Flask, render_template, abort
import json
import os

app = Flask(__name__)


def load_jobs():
    data_path = os.path.join(app.root_path, "data", "jobs.json")
    with open(data_path, "r", encoding="utf-8") as file:
        return json.load(file)


@app.route("/")
def home():
    jobs = load_jobs()
    return render_template("index.html", jobs=jobs)


@app.route("/job/<int:job_id>")
def job_details(job_id):
    jobs = load_jobs()

    job = next((job for job in jobs if job["id"] == job_id), None)

    if not job:
        abort(404)

    return render_template("details.html", job=job)


@app.errorhandler(404)
def page_not_found(error):
    return "<h2>404 - Page Not Found</h2>", 404


if __name__ == "__main__":
    app.run(debug=True)