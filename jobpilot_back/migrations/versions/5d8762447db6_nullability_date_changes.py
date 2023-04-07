"""Nullability and date changes

Revision ID: 5d8762447db6
Revises: c6c8f50e3203
Create Date: 2023-04-07 02:03:20.510681

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5d8762447db6'
down_revision = 'c6c8f50e3203'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('education', schema=None) as batch_op:
        batch_op.alter_column('currently_attending',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=False)
        batch_op.alter_column('start_date',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Date(),
               nullable=False)
        batch_op.alter_column('end_date',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Date(),
               existing_nullable=True)

    with op.batch_alter_table('work_experience', schema=None) as batch_op:
        batch_op.alter_column('company_name',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('location',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('currently_working',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=False)
        batch_op.alter_column('title',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('start_date',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Date(),
               nullable=False)
        batch_op.alter_column('end_date',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Date(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_experience', schema=None) as batch_op:
        batch_op.alter_column('end_date',
               existing_type=sa.Date(),
               type_=mysql.VARCHAR(length=255),
               existing_nullable=True)
        batch_op.alter_column('start_date',
               existing_type=sa.Date(),
               type_=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('title',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('currently_working',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=True)
        batch_op.alter_column('location',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('company_name',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)

    with op.batch_alter_table('education', schema=None) as batch_op:
        batch_op.alter_column('end_date',
               existing_type=sa.Date(),
               type_=mysql.VARCHAR(length=255),
               existing_nullable=True)
        batch_op.alter_column('start_date',
               existing_type=sa.Date(),
               type_=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('currently_attending',
               existing_type=mysql.TINYINT(display_width=1),
               nullable=True)

    # ### end Alembic commands ###