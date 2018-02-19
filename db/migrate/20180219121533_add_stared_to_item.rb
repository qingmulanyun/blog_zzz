class AddStaredToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :starred, :boolean, default: false
  end
end
