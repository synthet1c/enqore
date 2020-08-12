import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'
import { Arg } from 'type-graphql/dist/decorators/Arg'
import { db, Record } from './db'

@ObjectType()
class Recipe {
  @Field(type => ID)
  id: number

  @Field()
  name: string
}

@Resolver(Recipe)
class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query((returns: any) => Recipe)
  async recipe(@Arg('id') id: number) {
    const recipe = await db.test.find({ id })
    if (!recipe) throw new Error(`Recipe not found: ${id}`)
    return recipe
  }

  @Query(returns => [Recipe])
  async recipes() {
    return db.test.read()
  }
}