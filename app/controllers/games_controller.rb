class GamesController < ApplicationController
  def pop_a_shot
    @highscore = Score.highscore
    @score = Score.new
  end
end