class AddPointsToBlock < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :graded, :boolean
    add_column :blocks, :points, :string
  end
end
