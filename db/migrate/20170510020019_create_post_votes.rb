class CreatePostVotes < ActiveRecord::Migration
  def change
    create_table :post_votes, id: :uuid do |t|
      t.uuid :post_id
      t.uuid :user_id
      t.boolean :vote

      t.timestamps null: false
    end
  end
end
