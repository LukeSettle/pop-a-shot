class Score < ApplicationRecord
  default_scope { order(value: :desc) }

  def self.highscore
    first
  end
end
