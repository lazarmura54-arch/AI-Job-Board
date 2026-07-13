/*==================================================
                AI JOB BOARD
                RESUME-UPLOAD.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const uploadButton = document.getElementById("resumeUploadBtn");
  const fileInput = document.getElementById("resumeUpload");

  if (!uploadButton || !fileInput) return;

  /*==================================
            Open File Picker
    ==================================*/

  uploadButton.addEventListener("click", () => {
    fileInput.click();
  });

  /*==================================
            File Selected
    ==================================*/

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;

    const allowedExtensions = ["pdf", "doc", "docx"];

    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      alert("Only PDF, DOC and DOCX files are allowed.");

      fileInput.value = "";

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Maximum file size is 5 MB.");

      fileInput.value = "";

      return;
    }

    /*==================================
                Success
        ==================================*/

    uploadButton.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${file.name}`;

    uploadButton.classList.add("uploaded");

    console.log("Resume selected:", file);

    /*
            Future Backend Upload

            const formData = new FormData();

            formData.append("resume", file);

            fetch("/upload-resume", {

                method: "POST",

                body: formData

            });
        */
  });
});
