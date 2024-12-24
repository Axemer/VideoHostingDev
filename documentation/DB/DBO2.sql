
-- Таблица users
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar TEXT,
    subscriptions JSONB, -- Изменено на JSONB для лучшей производительности
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('anonymous', 'regular', 'confirmed', 'vip', 'tester', 'special_1', 'special_2', 'special_3', 'special_4', 'special_5', 'special_6', 'special_7', 'special_8', 'special_9', 'special_10', 'moderator', 'admin', 'super_admin', 'creator', 'banned', 'on_hold')) DEFAULT 'regular',
    rating INT DEFAULT 0
);

-- Таблица videos
CREATE TABLE videos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id BIGINT NOT NULL,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thumbnail TEXT,
    video_file TEXT NOT NULL,
    duration INTERVAL, -- Используется INTERVAL для хранения времени
    description TEXT,
    tags JSONB, -- Изменено на JSONB
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE -- Добавлено ON DELETE CASCADE
);

-- Таблица comments
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    video_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    text TEXT NOT NULL,
    attachment TEXT,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица tags
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50)
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Таблица video_tags
CREATE TABLE video_tags (
    video_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (video_id, tag_id),
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
