# frozen_string_literal: true

class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :title
      t.text :description
      t.integer :cost

      t.timestamps
    end
  end
end
