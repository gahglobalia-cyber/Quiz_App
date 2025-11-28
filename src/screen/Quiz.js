import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomScreen from '../components/CustomScreen';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../utils/fonts';
import color from '../utils/color';
import quiz from '../utils/Json';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addTotalGame, addTotalScore} from '../redux/Slice';

const shuffleArray = array => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getRandomTime = () => Math.floor(Math.random() * 11) + 15;

const Quiz = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const Level = route.params.Level;
  const dispatch = useDispatch();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [skip, setSkip] = useState(0);
  const [index, setIndex] = useState(1);
  const [timerCount, setTimerCount] = useState(getRandomTime());
  const progressAnim = useRef(new Animated.Value(1)).current;
  const timerIntervalRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [finalData, setFinalData] = useState(null);

  useEffect(() => {
    const questionsForLevel = quiz[Level];
    const shuffledQ = shuffleArray(questionsForLevel).map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffledQ);
  }, [Level]);

  useEffect(() => {
    if (!shuffledQuestions.length) return;

    const randomTime = getRandomTime();
    setTimerCount(randomTime);
    progressAnim.setValue(1);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimerCount(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progressAnim, {
      toValue: 0,
      duration: randomTime * 1000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timerIntervalRef.current);
  }, [currentQuestionIndex, shuffledQuestions]);

  useEffect(() => {
    if (isFinished && finalData) {
      navigation.replace('Score', finalData);
      dispatch(addTotalScore({level: Level, score: score}));
      dispatch(addTotalGame({level: Level}));
    }
    console.log('calll');
  }, [isFinished, finalData, navigation]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelect = option => {
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrong(prev => prev + 1);
    }

    setTimeout(() => {
      moveNextQuestion(isCorrect, false);
    }, 1000);
  };

  const handleTimeUp = () => {
    setSkip(prev => prev + 1);
    moveNextQuestion(false, true);
  };

  const moveNextQuestion = (isCorrect, isSkipped) => {
    setIndex(prev => prev + 1);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    Animated.timing(progressAnim).stop();

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinalData({
        score: isCorrect ? score + 1 : score,
        wrong: !isCorrect && !isSkipped ? wrong + 1 : wrong,
        skip: isSkipped ? skip + 1 : skip,
        Level: Level,
      });
      setIsFinished(true);
    }
  };

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(6),
          alignItems: 'center',
          position: 'absolute',
          top: verticalScale(78),
          zIndex: 1,
          width: '100%',
          justifyContent: 'center',
        }}>
        <View style={style.timerContainer}>
          <Animated.View style={[style.timerBar, {width: barWidth}]} />
        </View>
        <Text style={style.timerText}>{timerCount}s</Text>
      </View>
      <CustomScreen
        header={'Quiz'}
        child={
          <View>
            {currentQuestion && (
              <>
                <View style={style.indexContaioner}>
                  <Text style={style.indexText}>Q {index}</Text>
                </View>
                <Text style={style.questionText}>
                  {currentQuestion.question}
                </Text>

                {currentQuestion.options.map((item, idx) => {
                  const isCorrect = item === currentQuestion.answer;
                  const isSelected = item === selectedAnswer;

                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        !selectedAnswer && handleAnswerSelect(item)
                      }
                      style={[
                        style.optionButton,
                        isSelected && isCorrect && style.correctOption,
                        isSelected && !isCorrect && style.incorrectOption,
                      ]}>
                      <Text style={style.optionText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
          </View>
        }
      />
    </>
  );
};

export default Quiz;

const style = StyleSheet.create({
  questionText: {
    fontSize: scale(16),
    fontFamily: fonts[700],
    color: color.textPrimary,
    marginBottom: verticalScale(24),
    textAlign: 'center',
    marginTop: verticalScale(48),
  },
  optionButton: {
    backgroundColor: color.secondary,
    borderTopLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  optionText: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    color: color.textSecondary,
  },
  correctOption: {
    backgroundColor: color.accentSecondary,
  },
  incorrectOption: {
    backgroundColor: color.accentTertiary,
  },
  timerContainer: {
    height: verticalScale(8),
    width: '80%',
    backgroundColor: color.grey,
    borderRadius: scale(8),
    overflow: 'hidden',
    marginVertical: verticalScale(12),
  },
  timerBar: {
    height: '100%',
    backgroundColor: color.secondary,
  },
  timerText: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    textAlign: 'center',
    color: color.textSecondary,
  },
  indexContaioner: {
    position: 'absolute',
    top: 0,
    left: 14,
    backgroundColor: color.secondary,
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(4),
  },
  indexText: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    textAlign: 'center',
    color: color.textSecondary,
  },
});
