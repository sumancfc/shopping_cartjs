// variables

const   courses = document.querySelector("#courses-list"),
        shoppingCartcontent = document.querySelector("#cart-content tbody"),
        clearCart = document.querySelector("#clear-cart");


//Listener

onLoadEventListener();

function onLoadEventListener() {
    //new course is added
    courses.addEventListener('click', buyCourses);
    //remove course items
    shoppingCartcontent.addEventListener('click', removeItems);
    //clear cart
    clearCart.addEventListener('click', clearShoppingCart);
    //print from local storage
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}


//Functions

function buyCourses(e) {
    // console.log(e.target);
    e.preventDefault();
    if(e.target.classList.contains("add-to-cart")) {
        const course = e.target.parentElement.parentElement;
        // read the value
        getCourses(course);
    }
}

function getCourses(course) {
   // create the object with course data
   const courseData = {
    image: course.querySelector("img").src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
   }
   //insert into the shopping cart
   addToCart(courseData);
}

//display the selected items in the shooping cart
function addToCart (course) {
    // console.log(course)
    const row = document.createElement('tr');

    row.innerHTML = 
    `
    <tr>
        <td>  <img src="${course.image}"> </td>
        <td>  ${course.title} </td>
        <td>  ${course.price} </td>
        <td>  <a href="#" class="remove" data-id="${course.id}"> X </a></td>
    </tr>
    `

    //Add to cart
    shoppingCartcontent.appendChild(row);

    //Add to localStorage
    addToLocalStorage(course);

}

function addToLocalStorage(course) {
    let courses = getCoursesFromStorage();

    //add the courses into the array
    courses.push(course);

    //storage only save strings, we need to convert json into string
    localStorage.setItem('courses', JSON.stringify(courses));

}

function getCoursesFromStorage() {
    let courses;

    const localStore = localStorage.getItem('courses');

    if( localStore === null) {
        courses = []
    }
    else{
       courses = JSON.parse(localStore);
    }
    return courses;
}

//remove course item from shopping cart(1 by 1)
function removeItems(e) {
    let course, courseId;
    
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        //to remove from local and shopping cart
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    //remove from local storage and cart 1 by 1
    removeCourseFromLocalAndCart(courseId);
}

//remove from local storage and cart 1 by 1
function removeCourseFromLocalAndCart(id) {
    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(courseLs, index){
        if(courseLs.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    //Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clear shopping cart(all in 1)

function clearShoppingCart() {
    // method 1
    // shoppingCartcontent.innerHTML = '';

    //method 2
    while(shoppingCartcontent.firstChild) {
        shoppingCartcontent.removeChild(shoppingCartcontent.firstChild);
    }

    //clear from local storage
    clearLocalSrorage();
}

//clear local storage
function clearLocalSrorage() {
    localStorage.clear();
}

//print and get course from local storage to shoppinf cart
function getFromLocalStorage(){
    let coursesLS = getCoursesFromStorage();
    
    //loop through the courses and print in shopping cart
    coursesLS.forEach(function(course){
        let row = document.createElement('tr'); 

        row.innerHTML = 
        `
        <tr>
            <td> <img src="${course.image}"> </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td><a href="#" class="remove" data-id="${course.id}">X</a></td>
        </tr>
        `
        shoppingCartcontent.appendChild(row); 
    })
    
}