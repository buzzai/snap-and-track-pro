/*
  # Create Timeline and Notifications System

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `created_at` (timestamp)

    - `tasks`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `title` (text)
      - `status` (text: pending, in-progress, completed)
      - `due_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `photos`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `url` (text)
      - `created_at` (timestamp)

    - `activities`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `user_id` (uuid)
      - `type` (text: task_created, task_updated, photo_added, team_joined)
      - `description` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)

    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `project_id` (uuid, foreign key)
      - `type` (text: task_update, new_photo, team_activity)
      - `title` (text)
      - `message` (text)
      - `read` (boolean, default false)
      - `created_at` (timestamp)

    - `team_members`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `user_id` (uuid)
      - `name` (text)
      - `role` (text)
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for project-based access control
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by anyone"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks are viewable by authenticated users"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tasks can be created by authenticated users"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Tasks can be updated by authenticated users"
  ON tasks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos are viewable by authenticated users"
  ON photos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Photos can be created by authenticated users"
  ON photos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('task_created', 'task_updated', 'photo_added', 'team_joined')),
  description text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Activities are viewable by authenticated users"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Activities can be created by authenticated users"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('task_update', 'new_photo', 'team_activity')),
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Notifications can be created for authenticated users"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  joined_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are viewable by authenticated users"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Team members can be added by authenticated users"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_photos_project_id ON photos(project_id);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at);
CREATE INDEX IF NOT EXISTS idx_activities_project_id ON activities(project_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_team_members_project_id ON team_members(project_id);
