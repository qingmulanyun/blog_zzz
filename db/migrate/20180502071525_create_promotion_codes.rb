class CreatePromotionCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :promotion_codes, id: :uuid  do |t|
      t.string   :key
      t.integer  :max_use
      t.integer  :times_used,   :default => 0
      t.references :promotion, foreign_key: true, type: :uuid, index: true

      t.timestamps
    end
  end
end
