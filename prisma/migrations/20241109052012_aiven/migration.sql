-- CreateTable
CREATE TABLE "jlpt_chokai" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" INTEGER NOT NULL,
    "question_number" INTEGER NOT NULL,
    "option_1" TEXT,
    "option_2" TEXT,
    "option_3" TEXT,
    "option_4" TEXT,
    "script" TEXT NOT NULL,
    "audio_url" TEXT,
    "answer" INTEGER,
    "explain" TEXT,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "chokai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jlpt_mondai" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" INTEGER NOT NULL,
    "mondai_content" TEXT NOT NULL,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "jlpt_mondai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jlpt_question" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" INTEGER NOT NULL,
    "question_number" INTEGER NOT NULL,
    "question_content" TEXT,
    "option_1" TEXT,
    "option_2" TEXT,
    "option_3" TEXT,
    "option_4" TEXT,
    "answer" INTEGER NOT NULL,
    "explanation" TEXT,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "jlpt_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" INTEGER NOT NULL,
    "requested_at" INTEGER NOT NULL,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "post_category" TEXT NOT NULL,
    "tags" TEXT[],
    "header_image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "post_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_translation" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER,
    "language_code" TEXT NOT NULL,
    "post_title" TEXT NOT NULL,
    "post_brief" TEXT NOT NULL,
    "table_of_contents" TEXT NOT NULL,
    "post_content" TEXT NOT NULL,

    CONSTRAINT "post_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribe" (
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(10) NOT NULL,
    "ip_address" VARCHAR(255),
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique" ON "jlpt_question"("year", "month", "question_number");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_user_id_key" ON "password_resets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_token_key" ON "password_resets"("token");

-- CreateIndex
CREATE UNIQUE INDEX "post_translation_unique" ON "post_translation"("post_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "post_translation" ADD CONSTRAINT "post_translation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
