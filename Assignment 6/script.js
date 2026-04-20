/**
 * Assignment #6
 * Student: M. Ahsan Tariq
 */

const targetImage = document.getElementById('myImage');
const showButton = document.getElementById('showBtn');
const hideButton = document.getElementById('hideBtn');

function showImage() {
    targetImage.classList.remove('hidden');
    
    showButton.classList.add('hidden');
    hideButton.classList.remove('hidden');
    
    console.log("Status: Image is now visible.");
}

function hideImage() {
    targetImage.classList.add('hidden');
    
    showButton.classList.remove('hidden');
    hideButton.classList.add('hidden');
    
    console.log("Status: Image is hidden.");
}