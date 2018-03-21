class AddIsPrimaryToAddress < ActiveRecord::Migration[5.1]
  def change
    add_column :addresses, :is_primary, :boolean
  end
end
