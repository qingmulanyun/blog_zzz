class AddMembershipToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :membership, :integer, :default => 0
    add_column :items, :membership, :integer, :default => 0
  end
end
