import { BigInt, store } from "@graphprotocol/graph-ts"
import { Store, Added, Removed } from "../generated/Store/Store"
import { Fragment } from "../generated/schema"

export function handleAdded(event: Added): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.params.fragment
  let entity = Fragment.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Fragment(id)
    entity.save()
  }
}

export function handleRemoved(event: Removed): void {
  let id = event.params.fragment
  let entity = Fragment.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    store.remove('Fragment', id)
  }
}
