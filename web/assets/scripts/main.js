const color_mode_elems = ds_a('.dark');
const root = ds(':root');
const root_styles = window.getComputedStyle(root);

function root_setvar(varname, value) {
   if (root_styles.getPropertyValue(`--${varname}`)) {
      root.style.setProperty(`--${varname}`, value);
   } else {
      throw new Error(`variable --${varname} doesn't exist`);
   }
};

function root_getvar(varname) {
   const val = root_styles.getPropertyValue(`--${varname}`);
   if (val !== '') {
      return val;
   } else {
      return null;
   }
};

function let_there_be_light() {
   color_mode_elems.forEach((elem) => {
      elem.className = elem.className.replace('dark', 'light');
   });
   root_setvar('text_main', '#000');
   root_setvar('text_inverse', '#fff');
   root_setvar('primary_color', '#fff');
   root_setvar('secondary_color', 'var(--grayish)');
}

function turn_off_the_lights() {
   color_mode_elems.forEach((elem) => {
      elem.className = elem.className.replace('light', 'dark');
   });   
   root_setvar('text_main', '#fff');
   root_setvar('text_inverse', '#000');
   root_setvar('primary_color', 'var(--grayish)');
   root_setvar('secondary_color', '#fff');
}

function lm() {let_there_be_light()};
function dm() {turn_off_the_lights()};

function lm_cb_check() {dark_mode_cb[0].checked ? lm() : dm();}

const dark_mode_cb = document.getElementsByName('dark_mode_cb');
dark_mode_cb[0].addEventListener('change', lm_cb_check);

window.addEventListener('DOMContentLoaded', () => {
   lm_cb_check();
});