// lấy ra elemetn trong form

let inputInfor = document.querySelector(".addinfor");
let formElement = document.querySelector("#form");
let error = document.querySelector(".error");
let taskItem = document.querySelector(".information");

// giá trị cho ô thêm vào
console.log(formElement);

const listJob = JSON.parse(localStorage.getItem("jobs")) || [];

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
});

function randerListJob() {
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

  console.log(jobInHtmls.join(""));
  taskItem.innerHTML = jobConvert.join("");
}

randerListJob();

function handleDelete(id) {
  console.log("onclick", id);
  confirm("bạn có chắc muốn xóa công việc!");
  if (confirm("bạn có chắc muốn xóa công việc!")) {
    let filterJobs = jobLocal.filter(function (job) {
      return job.id !== id;
    });
    localStorage.setItem("jobs", filterJobs);
    randerListJob();
    console.log(filterJobs);
  }
}
