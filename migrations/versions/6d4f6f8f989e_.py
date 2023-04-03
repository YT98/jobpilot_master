"""empty message

Revision ID: 6d4f6f8f989e
Revises: d082777b7816
Create Date: 2023-04-02 14:08:54.563295

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d4f6f8f989e'
down_revision = 'd082777b7816'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('job_posting', schema=None) as batch_op:
        batch_op.add_column(sa.Column('location', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('experience_qualification', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('education_qualification', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('job_posting', schema=None) as batch_op:
        batch_op.drop_column('education_qualification')
        batch_op.drop_column('experience_qualification')
        batch_op.drop_column('location')

    # ### end Alembic commands ###
