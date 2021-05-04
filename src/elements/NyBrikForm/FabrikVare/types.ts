export type ItemType = {
  root: {
    items: {
      item: Array<Item>
    }
  }
}

export type Item = {
  id: string,
  name: string
}