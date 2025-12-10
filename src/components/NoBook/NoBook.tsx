'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import Styles from './NoBook.module.scss';

export default function NoBook(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div className={Styles.NoBook} ref={ref}>
            <motion.div
                className={Styles.NoBook__content}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className={Styles.NoBook__icon}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    📚🚫
                </motion.div>

                <motion.div
                    className={Styles.NoBook__mainText}
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    책, 이제
                    <br />
                    <span>필요 없습니다.</span>
                </motion.div>

                <motion.div
                    className={Styles.NoBook__divider}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                />

                <motion.div
                    className={Styles.NoBook__subText}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    무거운 기본서와 기출문제집 대신<br />
                    <b>끝공 하나면 충분합니다.</b>
                </motion.div>
            </motion.div>
        </div>
    );
}
