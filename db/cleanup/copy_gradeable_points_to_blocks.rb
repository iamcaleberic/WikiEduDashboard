bad_gradeables = Gradeable.all.select { |g| Block.find_by(gradeable_id: g.id).nil? }
bad_gradeables.each { |g| g.destroy }

Gradeable.all.each do |gradeable|
  block = Block.find_by(gradeable_id: gradeable.id)
  block.points = gradeable.points.to_s
  block.graded = true
  block.save
end
