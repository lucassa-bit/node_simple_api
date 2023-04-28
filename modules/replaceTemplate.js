module.exports =  (template, product) => {
    let returnValue = template;
    // {%image%} => "🥑"
    Object.keys(product).forEach(
        (value) => {
            if (value === 'organic') {
                returnValue = returnValue.replace(`{%${value}%}`, product[value] ? '' : 'not-organic');
            }
            else {
                returnValue = returnValue.replaceAll(`{%${value}%}`, product[value]);
            }
        }
    );

    return returnValue;
};