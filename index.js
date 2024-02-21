// lấy ra elemetn trong form

let inputInfor = document.querySelector(".addinfor");
let formElement = document.querySelector("#form");
let error = document.querySelector(".error");
let taskItem = document.querySelector(".information");

let listJob = JSON.parse(localStorage.getItem("jobs")) || [];

// lắng nghe sự kiện submit
formElement.addEventListener("submit", function (event) {
  // ngăn chặn sự kiện mặc định của form
  event.preventDefault();
  if (!inputInfor.value) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }
  //   tạo đối tượng để chạy
  if (inputInfor.value) {
    // tạo đối tượng job
    let job = {
      id: Math.ceil(Math.random() * 100000000000),
      name: inputInfor.value,
      status: false,
    };

    // lấy dữ liệu trên local về dưới dạng mảng

    // pushjob vào mảng
    listJob.push(job);
    console.log(listJob);
    // lưu mảng lên local

    localStorage.setItem("jobs", JSON.stringify(listJob));
    // clear giá trị trong ô input
    inputInfor.value = "";
    inputInfor.focus();
  }
  render();
});

// hiển thị listJob
function render() {
  let jobInHtmls = listJob.map(function (job) {
    return `
    <div class="task">
          <div class="inputTask">
            <input type="checkbox" />
            <label>${job.name}</label>
          </div>
          <i onclick ="handleDelete(${job.id})" class="fa-solid fa-trash"></i>
        </div>
        <div class="line"></div>
        `;
  });

  let jobConvert = jobInHtmls.join("");
  taskItem.innerHTML = jobConvert;
}
// Gọi lại
render();

// xóa List Job
function handleDelete(id) {
  if (confirm("Bạn có chắc muốn xóa công việc này?")) {
    let filterJobs = listJob.filter(function (job) {
      return job.id !== id;
    });
    localStorage.setItem("jobs", JSON.stringify(filterJobs));
    listJob = filterJobs;
    render();
  }
}

// check box
let checkElement = document.querySelectorAll(
  '.inputTask input[type="checkbox"]'
);

checkElement.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      this.nextElementSibling.innerHTML =
        "<s>" + this.nextElementSibling.textContent + "</s>";
    } else {
      this.nextElementSibling.innerHTML = this.nextElementSibling.textContent;
    }
  });
});

// process

let percentElement = document.querySelector(".percent");

checkElement.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    let checkedCount = document.querySelectorAll(
      '.inputTask input[type="checkbox"]:checked'
    ).length;
    let totalCount = checkElement.length;

    let completionRatio = (checkedCount / totalCount) * 100;

    percentElement.textContent = completionRatio.toFixed(0) + "%";

    if (checkedCount === totalCount) {
      document.querySelector(".process h3").textContent =
        "Hoàn thành công việc";
    } else {
      document.querySelector(".process h3").textContent =
        "Tiến độ hoàn thành" + " " + percentElement.textContent;
    }
  });
});
