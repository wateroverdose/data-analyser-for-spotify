// ? domnode_select
function ds(dom_node) {
   if (dom_node === undefined) {return undefined} else {return document.querySelector(dom_node)};
}

// ? domnode_select_all
function ds_a(dom_node) {
   if (dom_node === undefined) {return undefined} else {return document.querySelectorAll(dom_node)};
}

function get_style(element, style, conv_px_to_rem, add_rem_postfix) {
   if (element === undefined || style === undefined) return undefined;
   let x = window.getComputedStyle(element).getPropertyValue(style);
   if (conv_px_to_rem) {
      x = rem_px_conv(x, true, true);
      if (add_rem_postfix) x += 'rem';
   }
   return x;
}