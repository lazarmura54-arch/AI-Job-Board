# ======================================================
# AI JOB BOARD
# Flask Backend
# ======================================================

from flask import Flask, render_template, abort
import json
import os

app = Flask(__name__)

# ======================================================
# DATA PATH
# ======================================================

DATA_FILE = os.path.join(
    app.static_folder,
    "data",
    "jobs.json"
)

# ======================================================
# LOAD JOBS
# ======================================================

def load_jobs():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

# ======================================================
# HOME
# ======================================================

@app.route("/")
def home():

    jobs = load_jobs()

    featured_jobs = jobs[:6]

    return render_template(
        "index.html",
        jobs=featured_jobs
    )

# ======================================================
# JOBS
# ======================================================

@app.route("/jobs")
def jobs():

    jobs = load_jobs()

    return render_template(
        "jobs.html",
        jobs=jobs
    )

# ======================================================
# JOB DETAILS
# ======================================================

@app.route("/job/<int:job_id>")
def job_details(job_id):

    jobs = load_jobs()

    job = next((j for j in jobs if j["id"] == job_id), None)

    if not job:
        abort(404)

    similar_jobs = []

    for j in jobs:

        if j["id"] == job["id"]:
            continue

        score = 0

        # 1. Same Category (Highest Priority)
        if j["category"] == job["category"]:
            score += 5

        # 2. Same Skills
        common_skills = set(job["skills"]) & set(j["skills"])
        score += len(common_skills) * 2

        # 3. Same Job Type
        if j["type"] == job["type"]:
            score += 2

        similar_jobs.append({
            "score": score,
            "job": j
        })

    # Highest score first
    similar_jobs.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    # Only Top 3
    similar_jobs = [
        item["job"]
        for item in similar_jobs[:3]
    ]

    return render_template(
        "job-details.html",
        job=job,
        similar_jobs=similar_jobs
    )
# ======================================================
# COMPANIES
# ======================================================

@app.route("/companies")
def companies():

    jobs = load_jobs()

    companies = {}

    for job in jobs:

        company = job["company"]

        if company not in companies:

            companies[company] = {

                "name": company,
                "logo": job.get("logo", ""),
                "location": job.get("location", ""),
                "industry": job.get("category", ""),
                "jobs": 0

            }

        companies[company]["jobs"] += 1

    return render_template(
        "companies.html",
        companies=list(companies.values())
    )

# ======================================================
# COMPANY DETAILS
# ======================================================

@app.route("/company/<company_name>")
def company_details(company_name):

    companies = load_companies()
    jobs = load_jobs()

    company = next(
        (
            c
            for c in companies
            if c["name"].lower() == company_name.lower()
        ),
        None,
    )

    if not company:
        abort(404)

    company_jobs = [
        job
        for job in jobs
        if job["company"].lower() == company["name"].lower()
    ]

    return render_template(
        "company-details.html",
        company=company,
        jobs=company_jobs,
    )
# ======================================================
# ABOUT
# ======================================================

@app.route("/about")
def about():

    return render_template("about.html")

# ======================================================
# CONTACT
# ======================================================

@app.route("/contact")
def contact():

    return render_template("contact.html")

# ======================================================
# 404
# ======================================================

@app.errorhandler(404)
def page_not_found(e):

    jobs = load_jobs()

    return render_template(
        "404.html",
        jobs=jobs
    ), 404

# ======================================================
# RUN SERVER
# ======================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )