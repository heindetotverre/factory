const mapping = (mapType, mapKey) => {
  if (mapType === 'layouts') {
    const layouts = require('~/libs/layouts.json')
    return layouts[mapKey]
  }
  if (mapType === 'forms') {
    const forms = require('~/libs/forms.json')
    const listSrc = require('~/libs/lists.json')
    if (mapKey === 'FactoryCreatePage') {
      const list = listSrc[forms[mapKey].fields.layout.listKey]
      forms[mapKey].fields.layout.items = list.content
    }
    return forms[mapKey]
  }
}

export {
  mapping
}