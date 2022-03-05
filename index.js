var storageRef = firebase.storage().ref("/Images/my-pics.jpg");
var inputImage = document.getElementById('chooseFile');
var uploadBtn = document.getElementById('uploadBtn');
var db = firebase.firestore();
var imageList = [];
var fileData;

inputImage.addEventListener('change', (e) => {
    fileData = e.target.files[0];
})

uploadBtn.addEventListener('click' , (e) => {
    uploadImg();
    fileData = "";
})


var uploadImg = async () => {
    try {

        document.getElementById('svg').style.display = "inline";
        
        let storageRef = firebase.storage().ref("/Images/" + parseInt(Math.random()*10000000000));
        var data = await storageRef.put(fileData);
        let url = await data.ref.getDownloadURL();
        console.log(url);
        imageList.push(url);
        refreshUI();
        loadSingleImage(url);
        
        var data = {
            images : imageList
        }

        document.getElementById('svg').style.display = "none";
        inputImage.value = "";
        var imageTag = document.getElementById('img');
        imageTag.src = url;

        await updateDocument(data);
        
    } catch (error) {
        console.log(error);
        document.getElementById('svg').style.display = "none";
    }
}

var createDocumentInDataBase = async (data) => {
    try {
        await db.collection("Images").doc("image-list").set(data);
        console.log("document successfully created");
    } catch (error) {
        console.log(error);
    }
}

var readDocumentById = async () => {
    try {
        var document = await db.collection("Images").doc("image-list").get();
        return document.data();
    } catch (error) {
        console.log(error);
    }
}

var updateDocument = async (data) => {
    try {
        var document = await db.collection("Images").doc("image-list").set(data, {merge : true});
    } catch (error) {
        console.log(error);
    }
}


function refreshUI () {
    var list = document.querySelector('.imgCont');
    list.innerHTML = '';
    for (let i = 0; i < imageList.length; i++) {
        list.innerHTML += `<img id="img" src="${imageList[i]}" >` ;
    }
}

function loadSingleImage(){
    var list = document.querySelector('.list');
    let ele = document.createElement('img');
    ele.src = url;
    ele.classList.add("image");
    list.appendChild(ele);
}

Start();

async function Start () {
    var data = await readDocumentById();
    imageList = data.images;
    refreshUI();
}
