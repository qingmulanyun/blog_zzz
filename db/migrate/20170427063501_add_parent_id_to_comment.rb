class AddParentIdToComment < ActiveRecord::Migration
  def up
    add_column :comments, :parent_id, :uuid
  end

  def down
    remove_column :comments, :parent_id
  end
end
