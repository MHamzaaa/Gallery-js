var storageRef = firebase.storage().ref("/Images/my-pics.jpg");
var inputImage = document.getElementById('chooseFile');
var uploadBtn = document.getElementById('uploadBtn');
var fileData;

inputImage.addEventListener('change', (e) => {
    fileData = e.target.files[0];
})

uploadBtn.addEventListener('click' , (e) => {
    uploadImg();
})


var uploadImg = async () => {
    try {

        document.getElementById('svg').style.display = "inline";
        
        let storageRef = firebase.storage().ref("/Images/" + parseInt(Math.random()*10000000000));
        var data = await storageRef.put(fileData);
        let url = await data.ref.getDownloadURL();
        console.log(url);

        document.getElementById('svg').style.display = "none";

        document.getElementById('img').src = url;
    } catch (error) {
        console.log(error);
        document.getElementById('svg').style.display = "none";
    }
}


