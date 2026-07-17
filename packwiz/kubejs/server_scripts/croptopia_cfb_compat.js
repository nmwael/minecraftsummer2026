ServerEvents.tags('item', event => {
  event.add('cookingforblockheads:utensils', 'croptopia:cooking_pot')
  event.add('cookingforblockheads:utensils', 'croptopia:food_press')
  event.add('cookingforblockheads:utensils', 'croptopia:frying_pan')
  event.add('cookingforblockheads:utensils', 'croptopia:knife')
  event.add('cookingforblockheads:utensils', 'croptopia:mortar_and_pestle')

  event.add('cookingforblockheads:milk', 'croptopia:milk_bottle')
  event.add('cookingforblockheads:water', 'croptopia:water_bottle')

  event.add('cookingforblockheads:ingredients', 'maple:salt')
  event.add('cookingforblockheads:ingredients', 'maple:flour')
  event.add('cookingforblockheads:ingredients', 'maple:maple_syrup')
  event.add('cookingforblockheads:ingredients', 'maple:cream')
  event.add('cookingforblockheads:ingredients', 'maple:soybean')
  event.add('cookingforblockheads:ingredients', 'maple:rice')
  event.add('cookingforblockheads:ingredients', 'maple:tofu')
  event.add('cookingforblockheads:ingredients', 'maple:cheese')
  event.add('cookingforblockheads:ingredients', 'maple:cooked_rice')
  event.add('cookingforblockheads:ingredients', 'maple:beef_rice')
  event.add('cookingforblockheads:ingredients', 'maple:milk_icecream')
  event.add('cookingforblockheads:ingredients', 'maple:milk_bottom')
  event.add('cookingforblockheads:ingredients', 'maple:sanshoku_dango')
  event.add('cookingforblockheads:ingredients', 'maple:anko_dango')
  event.add('cookingforblockheads:ingredients', 'maple:kinako_dango')
  event.add('cookingforblockheads:ingredients', 'maple:zunda_dango')
  event.add('cookingforblockheads:ingredients', 'maple:mochi')
  event.add('cookingforblockheads:ingredients', 'maple:sakura_mochi')
  event.add('cookingforblockheads:ingredients', 'maple:melon_juice')
  event.add('cookingforblockheads:ingredients', 'maple:apple_juice')
  event.add('cookingforblockheads:ingredients', 'maple:carrot_juice')
  event.add('cookingforblockheads:ingredients', 'maple:sweet_berries_juice')
  event.add('cookingforblockheads:ingredients', 'maple:glow_berries_juice')
  event.add('cookingforblockheads:ingredients', 'maple:chorus_juice')
  event.add('cookingforblockheads:ingredients', 'maple:green_tea_leaves')
  event.add('cookingforblockheads:ingredients', 'maple:red_tea_leaves')
  event.add('cookingforblockheads:ingredients', 'maple:green_tea')
  event.add('cookingforblockheads:ingredients', 'maple:red_tea')

  for (const id of [
    'flour', 'dough', 'molasses', 'soy_milk', 'butter', 'cheese', 'salt',
    'bacon', 'ground_pork', 'sausage', 'pepper', 'paprika', 'chile_pepper',
    'noodle', 'tortilla', 'olive_oil', 'cooking_oil', 'yeast', 'tofu',
    'grilled_sausage', 'soy_sauce', 'vinegar', 'sugar', 'caramel',
    'nutmeg', 'cinnamon', 'vanilla', 'baking_soda', 'baking_powder',
    'coconut', 'raisins', 'corn_husk', 'cucumber', 'pickles',
    'kale', 'soybean', 'leek', 'scallion', 'asparagus', 'rhubarb',
    'radish', 'zucchini', 'artichoke', 'turnip', 'celery', 'broccoli',
    'cauliflower', 'eggplant', 'olive', 'onion', 'tomato', 'corn',
    'rice', 'oat', 'barley', 'sweet_potato', 'yam', 'garlic', 'ginger',
    'basil', 'curry_leaf', 'tea', 'coffee_beans',
    'pineapple', 'grape', 'banana', 'orange', 'lemon', 'lime',
    'strawberry', 'cranberry', 'blueberry', 'blackberry', 'raspberry',
    'cherry', 'apple', 'apricot', 'peach', 'pear', 'plum', 'fig',
    'nectarine', 'date', 'mango', 'dragon_fruit', 'breadfruit', 'starfruit',
    'roasted_nuts', 'walnut', 'almond', 'pecan', 'cashew', 'peanut',
    'roasted_peanuts', 'candied_nuts', 'artichoke_dip', 'salsa', 'guacamole', 'hummus',
  ]) {
    event.add('cookingforblockheads:ingredients', 'croptopia:' + id)
  }
})

ServerEvents.recipes(event => {
  event.remove({ id: 'croptopia:sausage' })
  event.shapeless(
    Item.of('croptopia:sausage', 1),
    ['#c:ground_pork', '#c:salts', '#c:paprika']
  )
})
