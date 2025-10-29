// When the mouse is hovering over the graphic design image, the caption text is shown, and when the mouse is not over the image, the caption text is hidden.
document.addEventListener("DOMContentLoaded", function() {
    let graphicDesignPictures = document.querySelectorAll('.graphic-design-image');
    let graphicDesignCaption = document.querySelectorAll('.caption_text');

    for (let i = 0; i < graphicDesignPictures.length; i++) {
        graphicDesignPictures[i].addEventListener('mouseover', () => {
            graphicDesignCaption[i].style.visibility = 'visible';
        });

        graphicDesignPictures[i].addEventListener('mouseout', ()=> {
            graphicDesignCaption[i].style.visibility = 'hidden';
        });
    }
})