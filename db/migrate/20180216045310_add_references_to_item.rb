class AddReferencesToItem < ActiveRecord::Migration[5.1]
  def change
    add_reference :items, :item_type, type: :uuid, foreign_key: true
    add_reference :items, :item_brand, type: :uuid, foreign_key: true
  end
end
