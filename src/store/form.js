export const checkValidaty = ( value, rules ) => {
  let isValid = true;
  if(rules.required) isValid = value.trim() !== "" && isValid;
  if(rules.minLength) isValid = value.length >= rules.minLength && isValid
  if(rules.maxLength) isValid = value.length <= rules.maxLength && isValid
  if(rules.isEmail){
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      isValid = pattern.test(value) && isValid
  }
  if(rules.isNumber) isValid = !isNaN(rules.isNumber)  && isValid

  return isValid
}

export const inputChangedHandler = (controls, controlName, value ) => {
  const updateControls = {
      ...controls,
      [controlName]: {
          ...controls[controlName],
          value: value,
          valid: checkValidaty(value, controls[controlName].validation),
          touched: true
      }
  }
  return updateControls
}

export const clearInputs = (controls) =>{
  const clearedInputs = {...controls}
  for(let key in clearedInputs){
    clearedInputs[key].value = ""
    clearedInputs[key].touched = false
  }
  return  clearedInputs
}