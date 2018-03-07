class AddUserReferenceToAddress < ActiveRecord::Migration[5.1]
  def change
    add_reference :addresses, :user, type: :uuid, foreign_key: true, index: true
  end
end
