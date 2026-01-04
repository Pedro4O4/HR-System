'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function EmotionCacheProvider(props: { children: React.ReactNode }) {
    const { options, cache, flush } = useEmotionCache();

    useServerInsertedHTML(() => {
        const styles = flush();
        if (styles.length === 0) {
            return null;
        }
        let names = '';
        let emotionStyles = '';
        for (const { name, value } of styles) {
            names += ` ${name}`;
            emotionStyles += value;
        }
        return (
            <style
                data-emotion={`${options.key}${names}`}
                dangerouslySetInnerHTML={{ __html: emotionStyles }}
            />
        );
    });

    return <CacheProvider value={cache}>{props.children}</CacheProvider>;
}

function useEmotionCache() {
    const cache = React.useMemo(() => {
        return createCache({ key: 'css', prepend: true });
    }, []);

    const flush = React.useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const styles = (cache as any).inserted;
        if (!styles) {
            return [];
        }
        const serialized: Array<{ name: string; value: string }> = [];
        for (const [key, value] of Object.entries(styles)) {
            if (typeof value === 'boolean') continue;
            serialized.push({ name: key, value: value as string });
        }
        return serialized;
    }, [cache]);

    return {
        cache,
        flush,
        options: cache,
    };
}
