 let loved_products = JSON.parse(localStorage.getItem("loved_products")) || [];
export const get_form_localStorage = ()=>{
for (let i of loved_products) {
  let element = document.getElementById(i);

  if (element) {
    element.classList.add("loved");
  }
}
}
export const love = (id) => {
  if (!loved_products.includes(id)) {
    loved_products.push(id);
  } else {
    loved_products = loved_products.filter((x) => x !== id);
  }
  localStorage.setItem("loved_products", JSON.stringify(loved_products));
  document.getElementById(id).classList.toggle("loved");
};
