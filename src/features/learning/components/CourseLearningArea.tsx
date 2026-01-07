"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/features/i18n';

// Interactive Quiz data with timestamps
interface VideoQuiz {
    timeInSeconds: number;
    question: string;
    type: 'multiple_choice' | 'written'; // ประเภทคำถาม
    options?: string[]; // สำหรับ multiple choice
    correctAnswer?: number; // สำหรับ multiple choice
    sampleAnswer?: string; // ตัวอย่างคำตอบสำหรับข้อเขียน
    minLength?: number; // ความยาวขั้นต่ำของคำตอบ (ตัวอักษร)
}

const CourseLearningArea = () => {
    const { t } = useLanguage();
    const [currentLesson, setCurrentLesson] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState<'resources'>('resources');
    const [notes, setNotes] = useState<{ id: number; time: string; text: string }[]>([
        { id: 1, time: '02:30', text: 'ความสำคัญของ Receptor ในการออกฤทธิ์ของยา' },
        { id: 2, time: '05:15', text: 'ประเภทของ Drug-Receptor Interactions' },
    ]);
    const [newNote, setNewNote] = useState('');

    // Interactive Quiz States
    const [showQuizPopup, setShowQuizPopup] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<VideoQuiz | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [writtenAnswer, setWrittenAnswer] = useState(''); // สำหรับคำตอบข้อเขียน
    const [answerResult, setAnswerResult] = useState<'correct' | 'wrong' | 'submitted' | null>(null);
    const [videoTime, setVideoTime] = useState(0);
    const [answeredQuizzes, setAnsweredQuizzes] = useState<number[]>([]);

    // Simulate video progress
    const videoTimerRef = useRef<NodeJS.Timeout | null>(null);

    const courseName = t('เภสัชวิทยาคลินิกเบื้องต้น', 'Introduction to Clinical Pharmacology');
    const courseProgress = 40;

    const lessons = [
        {
            id: 1,
            title: 'บทนำ: หลักการพื้นฐานของเภสัชวิทยา',
            duration: '15 นาที',
            completed: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'เรียนรู้หลักการพื้นฐานของเภสัชวิทยา ความสำคัญของการศึกษายา และบทบาทของเภสัชกรในระบบสาธารณสุข',
            documents: [
                { name: 'สไลด์บทที่ 1 - หลักการพื้นฐาน', size: '2.5 MB', type: 'pdf' },
                { name: 'แบบฝึกหัดท้ายบท', size: '500 KB', type: 'pdf' },
            ],
            timestamps: [
                { time: '00:00', title: 'แนะนำเนื้อหา' },
                { time: '02:30', title: 'ความหมายของเภสัชวิทยา' },
                { time: '05:00', title: 'ประวัติความเป็นมา' },
                { time: '08:30', title: 'บทบาทของเภสัชกร' },
                { time: '12:00', title: 'สรุปเนื้อหา' },
            ],
            // Interactive quizzes with time triggers (in seconds)
            videoQuizzes: [
                {
                    timeInSeconds: 5, // Quiz at 5 seconds 
                    type: 'multiple_choice',
                    question: 'เภสัชวิทยา (Pharmacology) หมายถึงอะไร?',
                    options: [
                        'การศึกษาเกี่ยวกับยาและผลของยาต่อร่างกาย',
                        'การศึกษาเกี่ยวกับโรคติดต่อ',
                        'การศึกษาเกี่ยวกับระบบประสาท',
                        'การศึกษาเกี่ยวกับโภชนาการ'
                    ],
                    correctAnswer: 0
                },
                {
                    timeInSeconds: 15, // Quiz at 15 seconds - คำถามข้อเขียน
                    type: 'written',
                    question: 'จงอธิบายความแตกต่างระหว่าง Pharmacokinetics และ Pharmacodynamics โดยสังเขป',
                    sampleAnswer: 'Pharmacokinetics คือการศึกษาว่ายาเคลื่อนที่ในร่างกายอย่างไร (ADME) ส่วน Pharmacodynamics คือการศึกษาว่ายาออกฤทธิ์ต่อร่างกายอย่างไร',
                    minLength: 0
                },
                {
                    timeInSeconds: 30, // Quiz at 30 seconds
                    type: 'multiple_choice',
                    question: 'ข้อใดเป็นขั้นตอนของ ADME?',
                    options: [
                        'Analysis, Design, Making, Evaluation',
                        'Absorption, Distribution, Metabolism, Excretion',
                        'Administration, Dosage, Monitoring, Effect',
                        'Action, Delivery, Movement, Elimination'
                    ],
                    correctAnswer: 1
                },
            ]
        },
        {
            id: 2,
            title: 'กลไกการออกฤทธิ์ของยา',
            duration: '25 นาที',
            completed: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'ศึกษาเกี่ยวกับกลไกการออกฤทธิ์ของยา ตัวรับยา (Receptors) และปฏิกิริยาระหว่างยากับเซลล์',
            documents: [
                { name: 'สไลด์บทที่ 2 - กลไกการออกฤทธิ์', size: '3.2 MB', type: 'pdf' },
            ],
            timestamps: [],
            videoQuizzes: [
                {
                    timeInSeconds: 10,
                    type: 'multiple_choice',
                    question: 'Receptor ทำหน้าที่อะไร?',
                    options: [
                        'ผลิตยาในร่างกาย',
                        'รับสัญญาณจากยาและส่งต่อไปยังเซลล์',
                        'ขับยาออกจากร่างกาย',
                        'เก็บยาไว้ในกล้ามเนื้อ'
                    ],
                    correctAnswer: 1
                },
                {
                    timeInSeconds: 20,
                    type: 'written',
                    question: 'จงยกตัวอย่าง Receptor ที่สำคัญในร่างกายมา 2 ชนิด พร้อมอธิบายหน้าที่โดยสังเขป',
                    sampleAnswer: 'เช่น Beta-receptor ทำหน้าที่ควบคุมหัวใจและหลอดลม, Dopamine receptor ทำหน้าที่ควบคุมอารมณ์และการเคลื่อนไหว',
                    minLength: 0
                }
            ]
        },
        {
            id: 3,
            title: 'การดูดซึมและการกระจายตัวของยา',
            duration: '30 นาที',
            completed: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'เข้าใจกระบวนการดูดซึมยา (Absorption) และการกระจายตัว (Distribution) ในร่างกาย',
            documents: [
                { name: 'สไลด์บทที่ 3 - Pharmacokinetics', size: '4.1 MB', type: 'pdf' },
            ],
            timestamps: [],
            videoQuizzes: []
        },
        {
            id: 4,
            title: 'การเปลี่ยนแปลงและการขับถ่ายยา',
            duration: '25 นาที',
            completed: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'ศึกษาการเปลี่ยนแปลงยาในร่างกาย (Metabolism) และการขับถ่ายออก (Excretion)',
            documents: [
                { name: 'สไลด์บทที่ 4 - Metabolism & Excretion', size: '3.5 MB', type: 'pdf' },
            ],
            timestamps: [],
            videoQuizzes: []
        },
        {
            id: 5,
            title: 'แบบทดสอบท้ายบท',
            duration: '20 นาที',
            completed: false,
            isQuiz: true,
            description: 'ทดสอบความเข้าใจจากเนื้อหาทั้งหมดที่เรียนมา',
            documents: [],
            timestamps: [],
            videoQuizzes: []
        },
    ];

    const currentLessonData = lessons.find(l => l.id === currentLesson);
    const completedCount = lessons.filter(l => l.completed).length;

    // Simulate video playback and check for quizzes
    useEffect(() => {
        if (isPlaying && !showQuizPopup) {
            videoTimerRef.current = setInterval(() => {
                setVideoTime(prev => {
                    const newTime = prev + 1;

                    // Check if there's a quiz at this time
                    const quiz = currentLessonData?.videoQuizzes?.find(
                        q => q.timeInSeconds === newTime && !answeredQuizzes.includes(q.timeInSeconds)
                    );

                    if (quiz) {
                        // Pause video and show quiz
                        setIsPlaying(false);
                        setCurrentQuiz(quiz as VideoQuiz);
                        setShowQuizPopup(true);
                        setSelectedAnswer(null);
                        setWrittenAnswer(''); // รีเซ็ตคำตอบข้อเขียน
                        setAnswerResult(null);
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (videoTimerRef.current) {
                clearInterval(videoTimerRef.current);
            }
        };
    }, [isPlaying, showQuizPopup, currentLessonData, answeredQuizzes]);

    // Reset video time when changing lessons
    useEffect(() => {
        setVideoTime(0);
        setAnsweredQuizzes([]);
        setIsPlaying(false);
    }, [currentLesson]);

    const handleAddNote = () => {
        if (newNote.trim()) {
            const minutes = Math.floor(videoTime / 60);
            const seconds = videoTime % 60;
            const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setNotes([...notes, {
                id: Date.now(),
                time: timeStr,
                text: newNote
            }]);
            setNewNote('');
        }
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const handleAnswerSubmit = () => {
        if (!currentQuiz) return;

        // สำหรับคำถามแบบตัวเลือก
        if (currentQuiz.type === 'multiple_choice') {
            if (selectedAnswer === null) return;
            const isCorrect = selectedAnswer === currentQuiz.correctAnswer;
            setAnswerResult(isCorrect ? 'correct' : 'wrong');
        }
        // สำหรับคำถามแบบข้อเขียน
        else if (currentQuiz.type === 'written') {
            // ไม่มีเงื่อนไขขั้นต่ำ ส่งได้ทันที
            setAnswerResult('submitted'); // ส่งคำตอบแล้ว
        }

        // After showing result, close popup and continue video
        setTimeout(() => {
            setAnsweredQuizzes([...answeredQuizzes, currentQuiz.timeInSeconds]);
            setShowQuizPopup(false);
            setCurrentQuiz(null);
            setSelectedAnswer(null);
            setWrittenAnswer(''); // รีเซ็ตคำตอบข้อเขียน
            setAnswerResult(null);
            setIsPlaying(true); // Resume video
        }, 1500);
    };

    const handleVideoToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const qaItems = [
        { id: 1, question: 'ทำไม Receptor จึงสำคัญ?', answer: 'Receptor เป็นตัวรับสัญญาณที่ทำให้ยาออกฤทธิ์ได้ตามที่ต้องการ', author: 'นศภ.สมชาย', time: '2 ชม.ที่แล้ว', likes: 5 },
        { id: 2, question: 'First-pass effect คืออะไร?', answer: 'คือกระบวนการที่ยาถูกเปลี่ยนแปลงที่ตับก่อนเข้าสู่กระแสเลือด', author: 'ภก.วิชัย', time: '5 ชม.ที่แล้ว', likes: 12 },
    ];

    return (
        <section className="course-learning-section" style={{ background: '#f8fafb', minHeight: '100vh' }}>
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="row g-0">
                    {/* Sidebar */}
                    <div className="col-lg-3 col-md-4" style={{
                        background: '#fff',
                        borderRight: '1px solid #e5e7eb',
                        minHeight: 'calc(100vh - 80px)',
                    }}>
                        <div className="lesson-sidebar" style={{ padding: '24px' }}>
                            {/* Course Header */}
                            <div className="course-info mb-4" style={{
                                background: 'linear-gradient(135deg, #004736 0%, #006B5A 100%)',
                                borderRadius: '16px',
                                padding: '20px',
                                color: '#fff',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255,255,255,0.2)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <i className="fas fa-book-medical" style={{ fontSize: '18px' }}></i>
                                    </div>
                                    <h6 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{courseName}</h6>
                                </div>
                                <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                    <span>{t('ความคืบหน้า', 'Progress')}</span>
                                    <span>{completedCount}/{lessons.length} {t('บท', 'lessons')} ({courseProgress}%)</span>
                                </div>
                                <div style={{
                                    height: '8px',
                                    background: 'rgba(255,255,255,0.3)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${courseProgress}%`,
                                        height: '100%',
                                        background: '#40C7A9',
                                        borderRadius: '4px',
                                        transition: 'width 0.5s ease'
                                    }}></div>
                                </div>
                            </div>

                            {/* Lessons List */}
                            <h6 style={{ color: '#014D40', marginBottom: '16px', fontWeight: '600' }}>
                                <i className="fas fa-list-ul" style={{ marginRight: '8px' }}></i>
                                {t('เนื้อหาการเรียน', 'Course Content')}
                            </h6>

                            <div style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
                                {lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        onClick={() => { setCurrentLesson(lesson.id); }}
                                        style={{
                                            padding: '14px 16px',
                                            borderRadius: '12px',
                                            marginBottom: '8px',
                                            cursor: 'pointer',
                                            background: currentLesson === lesson.id
                                                ? 'linear-gradient(135deg, #014D40 0%, #006B5A 100%)'
                                                : lesson.completed ? '#e8f8f4' : '#f9fafb',
                                            color: currentLesson === lesson.id ? '#fff' : '#333',
                                            border: currentLesson === lesson.id ? 'none' : '1px solid #e5e7eb',
                                            transition: 'all 0.3s ease',
                                            boxShadow: currentLesson === lesson.id ? '0 4px 12px rgba(1, 77, 64, 0.2)' : 'none',
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: lesson.completed
                                                    ? '#22c55e'
                                                    : currentLesson === lesson.id
                                                        ? 'rgba(255,255,255,0.2)'
                                                        : '#e5e7eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {lesson.completed ? (
                                                    <i className="fas fa-check" style={{ fontSize: '12px', color: '#fff' }}></i>
                                                ) : lesson.isQuiz ? (
                                                    <i className="fas fa-question" style={{ fontSize: '12px', color: currentLesson === lesson.id ? '#fff' : '#666' }}></i>
                                                ) : (
                                                    <span style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: currentLesson === lesson.id ? '#fff' : '#666'
                                                    }}>{index + 1}</span>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{
                                                    marginBottom: '2px',
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    lineHeight: '1.3'
                                                }}>{lesson.title}</p>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <small style={{
                                                        opacity: currentLesson === lesson.id ? 0.8 : 0.6,
                                                        fontSize: '12px'
                                                    }}>
                                                        <i className="fas fa-clock" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                                                        {lesson.duration}
                                                    </small>
                                                    {lesson.videoQuizzes && lesson.videoQuizzes.length > 0 && (
                                                        <small style={{
                                                            background: currentLesson === lesson.id ? 'rgba(255,255,255,0.2)' : '#fef3c7',
                                                            color: currentLesson === lesson.id ? '#fff' : '#92400e',
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            fontSize: '10px',
                                                            fontWeight: '600'
                                                        }}>
                                                            🎯 {lesson.videoQuizzes.length} คำถาม
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9 col-md-8" style={{ padding: '24px 32px' }}>
                        {currentLessonData?.isQuiz ? (
                            /* Final Quiz View */
                            <div className="quiz-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <h4 style={{ color: '#014D40', marginBottom: '30px' }}>
                                    <i className="fas fa-question-circle" style={{ marginRight: '12px' }}></i>
                                    แบบทดสอบท้ายบท
                                </h4>

                                <div className="quiz-question" style={{
                                    background: '#fff',
                                    borderRadius: '16px',
                                    padding: '32px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                    marginBottom: '24px'
                                }}>
                                    <p style={{ color: '#666', marginBottom: '8px', fontSize: '14px' }}>คำถามที่ 1 จาก 10</p>
                                    <h5 style={{ color: '#014D40', marginBottom: '24px', lineHeight: '1.5' }}>
                                        กระบวนการใดที่เกี่ยวข้องกับการดูดซึมยาเข้าสู่กระแสเลือด?
                                    </h5>

                                    <div className="options">
                                        {['Absorption', 'Distribution', 'Metabolism', 'Excretion'].map((option, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedAnswer(index)}
                                                style={{
                                                    padding: '16px 20px',
                                                    border: `2px solid ${selectedAnswer === index ? '#014D40' : '#e5e7eb'}`,
                                                    borderRadius: '12px',
                                                    marginBottom: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    background: selectedAnswer === index ? '#e8f8f4' : 'transparent'
                                                }}
                                            >
                                                <span style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: selectedAnswer === index ? '#014D40' : '#e8f8f4',
                                                    color: selectedAnswer === index ? '#fff' : '#014D40',
                                                    fontWeight: '600',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px'
                                                }}>
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span style={{ color: '#333' }}>{option}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="theme-btn" style={{
                                        background: '#fff',
                                        color: '#014D40',
                                        border: '2px solid #014D40',
                                        padding: '12px 24px',
                                        borderRadius: '10px'
                                    }}>
                                        <i className="fas fa-arrow-left me-2"></i>ข้อก่อนหน้า
                                    </button>
                                    <button className="theme-btn" style={{
                                        padding: '12px 24px',
                                        borderRadius: '10px'
                                    }}>
                                        ข้อถัดไป<i className="fas fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Video View with Interactive Features */
                            <div className="video-wrapper">
                                {/* Video Player */}
                                <div style={{ position: 'relative', marginBottom: '24px' }}>
                                    <div className="video-container" style={{
                                        background: '#000',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        aspectRatio: '16/9',
                                        position: 'relative',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                    }}>
                                        {/* Video simulation area */}
                                        <div
                                            onClick={handleVideoToggle}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                            }}
                                        >
                                            {!isPlaying ? (
                                                <div style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    background: 'linear-gradient(135deg, #014D40 0%, #40C7A9 100%)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 24px rgba(64, 199, 169, 0.4)',
                                                    transition: 'transform 0.2s ease',
                                                }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <i className="fas fa-play" style={{ fontSize: '28px', color: '#fff', marginLeft: '4px' }}></i>
                                                </div>
                                            ) : (
                                                <div style={{ textAlign: 'center', color: '#fff' }}>
                                                    <div style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        background: '#40C7A9',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto 16px',
                                                        animation: 'pulse 2s infinite',
                                                        transition: 'transform 0.2s ease',
                                                    }}
                                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    >
                                                        <i className="fas fa-pause" style={{ fontSize: '20px' }}></i>
                                                    </div>
                                                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>{t('กำลังเล่นวิดีโอ...', 'Playing video...')}</p>
                                                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#40C7A9' }}>
                                                        {formatTime(videoTime)}
                                                    </p>
                                                    <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                                                        {t('คลิกเพื่อหยุดวิดีโอ', 'Click to pause')}
                                                    </p>
                                                    {currentLessonData?.videoQuizzes && currentLessonData.videoQuizzes.length > 0 && (
                                                        <p style={{ fontSize: '14px', color: '#888', marginTop: '12px' }}>
                                                            🎯 {t('คำถามถัดไปที่', 'Next question at')}: {formatTime(
                                                                currentLessonData.videoQuizzes.find(q => q.timeInSeconds > videoTime && !answeredQuizzes.includes(q.timeInSeconds))?.timeInSeconds || 0
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Video time bar */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '20px',
                                                left: '20px',
                                                right: '20px',
                                            }}>
                                                {/* Quiz markers */}
                                                <div style={{
                                                    position: 'relative',
                                                    height: '8px',
                                                    background: 'rgba(255,255,255,0.2)',
                                                    borderRadius: '4px',
                                                    marginBottom: '8px'
                                                }}>
                                                    <div style={{
                                                        width: `${(videoTime / 60) * 100}%`,
                                                        height: '100%',
                                                        background: '#40C7A9',
                                                        borderRadius: '4px',
                                                        transition: 'width 0.3s ease'
                                                    }}></div>

                                                    {/* Quiz markers on timeline */}
                                                    {currentLessonData?.videoQuizzes?.map((quiz, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                position: 'absolute',
                                                                left: `${(quiz.timeInSeconds / 60) * 100}%`,
                                                                top: '-4px',
                                                                width: '16px',
                                                                height: '16px',
                                                                borderRadius: '50%',
                                                                background: answeredQuizzes.includes(quiz.timeInSeconds) ? '#22c55e' : '#f59e0b',
                                                                border: '2px solid #fff',
                                                                transform: 'translateX(-50%)',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                            title={`คำถามที่ ${formatTime(quiz.timeInSeconds)}`}
                                                        >
                                                            {answeredQuizzes.includes(quiz.timeInSeconds) ? (
                                                                <i className="fas fa-check" style={{ fontSize: '8px', color: '#fff' }}></i>
                                                            ) : (
                                                                <i className="fas fa-question" style={{ fontSize: '8px', color: '#fff' }}></i>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                                    <span>{formatTime(videoTime)}</span>
                                                    <span>01:00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lesson Info & Tabs */}
                                <div className="row g-4">
                                    <div className="col-lg-8">
                                        {/* Lesson Title */}
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            marginBottom: '20px',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                <h4 style={{ color: '#014D40', margin: 0, fontSize: '20px' }}>
                                                    {currentLessonData?.title}
                                                </h4>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    {currentLessonData?.videoQuizzes && currentLessonData.videoQuizzes.length > 0 && (
                                                        <span style={{
                                                            background: '#fef3c7',
                                                            color: '#92400e',
                                                            padding: '6px 12px',
                                                            borderRadius: '20px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                        }}>
                                                            🎯 {answeredQuizzes.length}/{currentLessonData.videoQuizzes.length} คำถาม
                                                        </span>
                                                    )}
                                                    <span style={{
                                                        background: currentLessonData?.completed ? '#22c55e' : '#f59e0b',
                                                        color: '#fff',
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                    }}>
                                                        {currentLessonData?.completed ? '✓ เรียนจบแล้ว' : '📖 กำลังเรียน'}
                                                    </span>
                                                </div>
                                            </div>
                                            <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                                {currentLessonData?.description}
                                            </p>
                                        </div>

                                        {/* Interactive Tabs */}
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                borderBottom: '1px solid #e5e7eb',
                                                background: '#f9fafb'
                                            }}>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        padding: '16px',
                                                        background: '#fff',
                                                        color: '#014D40',
                                                        fontWeight: '600',
                                                        borderBottom: '3px solid #014D40',
                                                        fontSize: '14px',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    📄 {t('เอกสาร', 'Documents')}
                                                </div>
                                            </div>

                                            <div style={{ padding: '24px', minHeight: '200px' }}>
                                                <div>
                                                    {currentLessonData?.documents?.map((doc, i) => (
                                                        <div key={i} style={{
                                                            padding: '16px 20px',
                                                            background: '#f9fafb',
                                                            borderRadius: '12px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '16px',
                                                            marginBottom: '12px',
                                                            border: '1px solid #e5e7eb'
                                                        }}>
                                                            <div style={{
                                                                width: '48px',
                                                                height: '48px',
                                                                borderRadius: '12px',
                                                                background: '#fee2e2',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                                <i className="fas fa-file-pdf" style={{ color: '#ef4444', fontSize: '20px' }}></i>
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <p style={{ margin: 0, fontWeight: '500' }}>{doc.name}</p>
                                                                <small style={{ color: '#888' }}>{doc.size}</small>
                                                            </div>
                                                            <button style={{
                                                                padding: '10px 16px',
                                                                background: '#014D40',
                                                                color: '#fff',
                                                                border: 'none',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                fontSize: '13px'
                                                            }}>
                                                                <i className="fas fa-download"></i> ดาวน์โหลด
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Sidebar */}
                                    <div className="col-lg-4">
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                                            marginBottom: '20px'
                                        }}>
                                            <h6 style={{ color: '#014D40', marginBottom: '16px', fontWeight: '600' }}>
                                                <i className="fas fa-tasks" style={{ marginRight: '8px' }}></i>
                                                {t('การดำเนินการ', 'Actions')}
                                            </h6>
                                            <button style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: '#014D40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                marginBottom: '12px'
                                            }}>
                                                <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                                                {t('ทำเครื่องหมายว่าเรียนจบ', 'Mark as Complete')}
                                            </button>
                                            {currentLesson < lessons.length && (
                                                <button
                                                    onClick={() => setCurrentLesson(currentLesson + 1)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '14px',
                                                        background: '#e8f8f4',
                                                        color: '#014D40',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {t('บทถัดไป', 'Next Lesson')} <i className="fas fa-arrow-right"></i>
                                                </button>
                                            )}
                                        </div>
                                        <Link href="/courses-grid?tab=my" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            padding: '14px',
                                            background: '#fff',
                                            border: '2px solid #014D40',
                                            borderRadius: '12px',
                                            color: '#014D40',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                        }}>
                                            <i className="fas fa-arrow-left"></i>
                                            กลับไปคอร์สของฉัน
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Interactive Quiz Popup Modal */}
            {showQuizPopup && currentQuiz && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '36px',
                        maxWidth: '550px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        animation: 'slideUp 0.3s ease'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                            }}>
                                <i className="fas fa-pause" style={{ fontSize: '24px', color: '#fff' }}></i>
                            </div>
                            <p style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '4px', fontSize: '14px' }}>
                                ⏸️ วิดีโอหยุดชั่วคราว
                            </p>
                            <h4 style={{ color: '#014D40', margin: 0 }}>
                                🎯 คำถามระหว่างเรียน
                            </h4>
                            <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
                                ตอบคำถามให้ถูกต้องเพื่อเล่นวิดีโอต่อ
                            </p>
                        </div>

                        <p style={{ color: '#333', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6', fontWeight: '500' }}>
                            {currentQuiz.question}
                        </p>

                        {/* คำถามแบบตัวเลือก (Multiple Choice) */}
                        {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                {currentQuiz.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => !answerResult && setSelectedAnswer(i)}
                                        disabled={answerResult !== null}
                                        style={{
                                            padding: '16px 20px',
                                            border: `2px solid ${answerResult ?
                                                (i === currentQuiz.correctAnswer ? '#22c55e' :
                                                    i === selectedAnswer && answerResult === 'wrong' ? '#ef4444' : '#e5e7eb')
                                                : selectedAnswer === i ? '#014D40' : '#e5e7eb'
                                                }`,
                                            borderRadius: '12px',
                                            background: answerResult ?
                                                (i === currentQuiz.correctAnswer ? '#dcfce7' :
                                                    i === selectedAnswer && answerResult === 'wrong' ? '#fee2e2' : '#fff')
                                                : selectedAnswer === i ? '#e8f8f4' : '#fff',
                                            textAlign: 'left',
                                            cursor: answerResult ? 'default' : 'pointer',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}
                                    >
                                        <span style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: answerResult ?
                                                (i === currentQuiz.correctAnswer ? '#22c55e' :
                                                    i === selectedAnswer ? '#ef4444' : '#e5e7eb')
                                                : selectedAnswer === i ? '#014D40' : '#e5e7eb',
                                            color: (selectedAnswer === i || (answerResult && i === currentQuiz.correctAnswer)) ? '#fff' : '#666',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '600',
                                            fontSize: '14px'
                                        }}>
                                            {answerResult && i === currentQuiz.correctAnswer ? '✓' :
                                                answerResult === 'wrong' && i === selectedAnswer ? '✕' :
                                                    String.fromCharCode(65 + i)}
                                        </span>
                                        <span style={{ color: '#333' }}>{opt}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* คำถามแบบข้อเขียน (Written) */}
                        {currentQuiz.type === 'written' && (
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    background: '#f0f9ff',
                                    border: '1px solid #0ea5e9',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="fas fa-pen" style={{ color: '#0ea5e9' }}></i>
                                    <span style={{ color: '#0369a1', fontSize: '14px' }}>
                                        {t('กรุณาพิมพ์คำตอบของคุณ', 'Please type your answer')}
                                    </span>
                                </div>
                                <textarea
                                    value={writtenAnswer}
                                    onChange={(e) => setWrittenAnswer(e.target.value)}
                                    placeholder={t('พิมพ์คำตอบของคุณที่นี่...', 'Type your answer here...')}
                                    disabled={answerResult !== null}
                                    style={{
                                        width: '100%',
                                        minHeight: '120px',
                                        padding: '16px',
                                        border: answerResult === 'submitted' ? '2px solid #22c55e' : '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        background: answerResult === 'submitted' ? '#f0fdf4' : '#fff',
                                    }}
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '8px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ color: '#888' }}>
                                        {writtenAnswer.length} {t('ตัวอักษร', 'characters')}
                                    </span>

                                </div>
                            </div>
                        )}

                        {answerResult === 'correct' && (
                            <div style={{
                                background: '#dcfce7',
                                color: '#166534',
                                padding: '16px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginBottom: '16px',
                                fontWeight: '600'
                            }}>
                                ✅ ถูกต้อง! กำลังเล่นวิดีโอต่อ...
                            </div>
                        )}

                        {answerResult === 'wrong' && (
                            <div style={{
                                background: '#fee2e2',
                                color: '#991b1b',
                                padding: '16px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginBottom: '16px',
                                fontWeight: '600'
                            }}>
                                ❌ ไม่ถูกต้อง ลองใหม่อีกครั้ง!
                            </div>
                        )}

                        {answerResult === 'submitted' && (
                            <div style={{
                                background: '#dcfce7',
                                color: '#166534',
                                padding: '16px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginBottom: '16px',
                                fontWeight: '600'
                            }}>
                                ✅ ส่งคำตอบเรียบร้อย! กำลังเล่นวิดีโอต่อ...
                                {currentQuiz.sampleAnswer && (
                                    <p style={{ fontWeight: 'normal', marginTop: '8px', fontSize: '13px' }}>
                                        💡 ตัวอย่างคำตอบ: {currentQuiz.sampleAnswer}
                                    </p>
                                )}
                            </div>
                        )}

                        {!answerResult && (
                            <button
                                onClick={handleAnswerSubmit}
                                disabled={
                                    currentQuiz.type === 'multiple_choice'
                                        ? selectedAnswer === null
                                        : false
                                }
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: (currentQuiz.type === 'multiple_choice' ? selectedAnswer === null : false)
                                        ? '#e5e7eb'
                                        : 'linear-gradient(135deg, #014D40 0%, #006B5A 100%)',
                                    color: (currentQuiz.type === 'multiple_choice' ? selectedAnswer === null : false)
                                        ? '#999'
                                        : '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    cursor: (currentQuiz.type === 'multiple_choice' ? selectedAnswer === null : false)
                                        ? 'not-allowed'
                                        : 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                {currentQuiz.type === 'written' ? 'ส่งคำตอบ' : 'ตรวจคำตอบ'}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
            `}</style>
        </section>
    );
};

export default CourseLearningArea;
