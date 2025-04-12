
// Event listener function that shows text when the mouse is hovering over the "The promises you faked." image
// and hides it when the mouse is not hovering over.

document.querySelector("#t_p_y_f_img").addEventListener('mouseover', function() {
    document.querySelector("#t_p_y_f").style.visibility = 'visible';
});

document.querySelector("#t_p_y_f_img").addEventListener('mouseout', function() {
    document.querySelector("#t_p_y_f").style.visibility = 'hidden';
});

// Event listener function that shows text when the mouse is hovering over the "Where do we go?" image
// and hides it when the mouse is not hovering over.

document.querySelector("#w_d_w_g_img").addEventListener('mouseover', function() {
    document.querySelector("#w_d_w_g").style.visibility = 'visible';
});

document.querySelector("#w_d_w_g_img").addEventListener('mouseout', function() {
    document.querySelector("#w_d_w_g").style.visibility = 'hidden';
});

// Event listener function that shows text when the mouse is hovering over the "Infinity, Forever" image
// and hides it when the mouse is not hovering over.

document.querySelector("#i_f_img").addEventListener('mouseover', function() {
    document.querySelector("#i_f").style.visibility = 'visible';
});

document.querySelector("#i_f_img").addEventListener('mouseout', function() {
    document.querySelector("#i_f").style.visibility = 'hidden';
});

