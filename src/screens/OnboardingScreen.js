import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { GlassCard } from '../components/UIComponents';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

// Spotify Wrapped–style story slides
const slides = [
    {
        id: '1',
        label: 'Chapter 1',
        title: 'Meet Airo',
        description: 'Your AI-powered nutrition sidekick. Built to make tracking effortless and insights beautiful.',
        icon: 'auto-awesome',
        accent: theme.gradients.ocean,
    },
    {
        id: '2',
        label: 'Chapter 2',
        title: 'Scan Every Bite',
        description: 'Use Cal AI to snap your meals and get instant health scores, macros, and calories.',
        icon: 'camera-alt',
        accent: theme.gradients.sunset,
    },
    {
        id: '3',
        label: 'Chapter 3',
        title: 'Cook Smarter',
        description: 'Fridge AI turns random ingredients into chef-level recipes in a few taps.',
        icon: 'kitchen',
        accent: theme.gradients.nature,
    },
    {
        id: '4',
        label: 'Finale',
        title: 'Ready for Your Best Food Year?',
        description: 'Start your Airo journey and let data, AI, and beautiful visuals guide your nutrition story.',
        icon: 'insights',
        accent: theme.gradients.dark,
    },
];

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('MainApp');
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({ item, index }) => {
        const isLast = index === slides.length - 1;

        return (
            <View style={styles.slide}>
                <Animatable.View
                    animation="fadeInDown"
                    duration={800}
                    style={styles.progressRow}
                >
                    <Text style={styles.progressLabel}>{item.label}</Text>
                    <Text style={styles.progressStep}>
                        {index + 1} / {slides.length}
                    </Text>
                </Animatable.View>

                <Animatable.View
                    animation="fadeInUp"
                    duration={900}
                    delay={100}
                    style={styles.cardWrapper}
                >
                    <GlassCard style={styles.storyCard} blurAmount={25}>
                        <View style={styles.storyHeader}>
                            <View style={styles.iconPill}>
                                <Icon name={item.icon} size={28} color={theme.colors.white} />
                            </View>
                            <Text style={styles.storyTitle}>{item.title}</Text>
                        </View>

                        <Text style={styles.storyDescription}>{item.description}</Text>

                        {/* Faux “stats” row to echo Spotify Wrapped visuals */}
                        <View style={styles.statsRow}>
                            <View style={styles.statBlock}>
                                <Text style={styles.statLabel}>Made for</Text>
                                <Text style={styles.statValue}>Busy humans</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBlock}>
                                <Text style={styles.statLabel}>Powered by</Text>
                                <Text style={styles.statValue}>AI & vision</Text>
                            </View>
                        </View>

                        {isLast && (
                            <View style={styles.finalTaglineContainer}>
                                <Text style={styles.finalTagline}>
                                    This year, your nutrition story is finally visual.
                                </Text>
                            </View>
                        )}
                    </GlassCard>
                </Animatable.View>
            </View>
        );
    };

    return (
        <GradientBackground>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.footerButtonsRow}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.replace('MainApp')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleNext}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.buttonText}>
                            {currentIndex === slides.length - 1 ? 'Start with Airo' : 'Next story'}
                        </Text>
                        <Icon
                            name={currentIndex === slides.length - 1 ? 'check' : 'arrow-forward'}
                            size={22}
                            color={theme.colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    slide: {
        width,
        height: height * 0.78,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    progressRow: {
        position: 'absolute',
        top: height * 0.08,
        left: theme.spacing.xl,
        right: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondaryLight,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    progressStep: {
        ...theme.typography.caption,
        color: theme.colors.white,
    },
    cardWrapper: {
        width: '100%',
        paddingHorizontal: theme.spacing.xl,
    },
    storyCard: {
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    storyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    iconPill: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    footer: {
        height: height * 0.22,
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xxl,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 28,
        backgroundColor: theme.colors.white,
    },
    footerButtonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    skipButton: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    skipText: {
        ...theme.typography.button,
        color: theme.colors.textSecondaryLight,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.soft,
        marginLeft: theme.spacing.sm,
    },
    buttonText: {
        ...theme.typography.button,
        color: theme.colors.primary,
        marginRight: theme.spacing.sm,
    },
});

export default OnboardingScreen;
